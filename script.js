const rates = {
  bike: { name: "Two-Wheeler", first: 20, extra: 15, max: 150 },
  car: { name: "Car", first: 50, extra: 30, max: 400 },
  suv: { name: "SUV / Large", first: 70, extra: 40, max: 500 }
};

let vehicle = "car";
const $ = id => document.getElementById(id);
const entry = $("entryDateTime");
const exit = $("exitDateTime");

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(value);
}

function durationText(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

function updateRateCard() {
  const rate = rates[vehicle];
  $("rateTitle").textContent = `${vehicle.toUpperCase()} - RATE CARD`;
  $("firstHourRate").textContent = money(rate.first);
  $("additionalHourRate").textContent = money(rate.extra);
  $("dailyMaxRate").textContent = money(rate.max);
}

function reset(message = "Enter valid entry and exit times.") {
  $("estimatedFee").textContent = money(0);
  $("summaryText").textContent = "Enter parking details";
  $("durationValue").textContent = "--";
  $("billableHours").textContent = "--";
  $("breakdownFirstHour").textContent = money(0);
  $("extraHours").textContent = money(0);
  $("dailyCap").textContent = "Not applied";
  $("totalPayable").textContent = money(0);
  $("note").textContent = message;
}

function calculate() {
  $("errorMessage").textContent = "";
  if (!entry.value || !exit.value) return reset();

  const start = new Date(entry.value);
  const end = new Date(exit.value);
  const minutes = Math.floor((end - start) / 60000);

  if (Number.isNaN(minutes) || minutes <= 0) {
    $("errorMessage").textContent = "Exit time must be after entry time.";
    return reset();
  }

  const rate = rates[vehicle];
  $("durationValue").textContent = durationText(minutes);
  $("summaryText").textContent = `${rate.name} · ${durationText(minutes)} parked`;

  if (minutes <= 15) {
    $("billableHours").textContent = "0";
    $("note").textContent = "Grace period applied. Stay is 15 minutes or less.";
    $("estimatedFee").textContent = money(0);
    $("totalPayable").textContent = money(0);
    return;
  }

  const hours = Math.ceil(minutes / 60);
  const extraCount = Math.max(hours - 1, 0);
  const rawFee = rate.first + extraCount * rate.extra;
  const fee = Math.min(rawFee, rate.max);

  $("billableHours").textContent = `${hours} ${hours === 1 ? "hour" : "hours"}`;
  $("breakdownFirstHour").textContent = money(rate.first);
  $("extraHours").textContent = `${extraCount} × ${money(rate.extra)} = ${money(extraCount * rate.extra)}`;
  $("dailyCap").textContent = rawFee > rate.max ? `Applied · ${money(rate.max)}` : "Not applied";
  $("estimatedFee").textContent = money(fee);
  $("totalPayable").textContent = money(fee);
  $("note").textContent = rawFee > rate.max
    ? `Daily maximum applied. Fee cannot exceed ${money(rate.max)}.`
    : "Grace period not used. Stay exceeds 15 minutes.";
}

document.querySelectorAll(".vehicle-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".vehicle-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    vehicle = button.dataset.vehicle;
    updateRateCard();
    calculate();
  });
});

entry.addEventListener("input", calculate);
exit.addEventListener("input", calculate);

function localDateTime(date) {
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const now = new Date();
const start = new Date(now);
start.setHours(14, 30, 0, 0);
const end = new Date(now);
end.setHours(17, 45, 0, 0);
entry.value = localDateTime(start);
exit.value = localDateTime(end);

updateRateCard();
calculate();