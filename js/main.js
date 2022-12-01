const elSelectRegion = document.querySelector(".select_region");
const elCurrentRegion = document.querySelector(".current_region");
const elCurrentDay = document.querySelector(".current_day");
const elCurrentTime = document.querySelector(".current_time");
const elCurrentDate = document.querySelector(".current_date");

const elFajrTime = document.querySelector(".prayer_list_time_fajr");
const elSunTime = document.querySelector(".prayer_list_time_sun");
const elDuhrTime = document.querySelector(".prayer_list_time_duhr");
const elAsrTime = document.querySelector(".prayer_list_time_asr");
const elMahgribTime = document.querySelector(".prayer_list_time_maghrib");
const elIshaTime = document.querySelector(".prayer_list_time_isha");

const elWeeklyRegionTitle = document.querySelector(".weekly_region");
const elMonthlyRegionTitle = document.querySelector(".monthly_region");
const mainFragment = document.createDocumentFragment();

const prayerTablesTemplate = document.querySelector(
  ".prayer_calendar_template"
).content;

// prayer tables
const prayerWeeklyTable = document.querySelector(".weekly_data");
const prayerMonthlyTable = document.querySelector(".monthly_data");

setInterval(() => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  elCurrentTime.textContent = `${hours}:${minutes}:${seconds}`;
});

// renderPrayerTimes
function renderPrayerTimes(item) {
  elCurrentRegion.textContent = item.region;
  elCurrentDate.textContent = item.date;
  elCurrentDay.textContent = item.weekday;
  elFajrTime.textContent = item.times.tong_saharlik;
  elSunTime.textContent = item.times.quyosh;
  elDuhrTime.textContent = item.times.peshin;
  elAsrTime.textContent = item.times.asr;
  elMahgribTime.textContent = item.times.shom_iftor;
  elIshaTime.textContent = item.times.hufton;
}

// render weekly data
function renderWeeklyData(arr, node) {
  node.innerHTML = "";
  arr.forEach((item) => {
    const clonedPrayerTemplate = prayerTablesTemplate.cloneNode(true);
    clonedPrayerTemplate.querySelector(".week_day_table").textContent =
      item.weekday;
    clonedPrayerTemplate.querySelector(".date_table").textContent =
      item.date.split("T")[0];
    clonedPrayerTemplate.querySelector(".fajr_time_table").textContent =
      item.times.tong_saharlik;
    clonedPrayerTemplate.querySelector(".duhr_time_table").textContent =
      item.times.quyosh;
    clonedPrayerTemplate.querySelector(".asr_time_table").textContent =
      item.times.asr;
    clonedPrayerTemplate.querySelector(".maghrib_time_table").textContent =
      item.times.shom_iftor;
    clonedPrayerTemplate.querySelector(".isha_time_table").textContent =
      item.times.hufton;
    mainFragment.appendChild(clonedPrayerTemplate);
  });
  node.appendChild(mainFragment);
}

// render monthly data
function renderMonthlyData(arr, node) {
  node.innerHTML = "";
  arr.forEach((item) => {
    const clonedPrayerTemplate = prayerTablesTemplate.cloneNode(true);
    clonedPrayerTemplate.querySelector(".week_day_table").textContent =
      item.weekday;
    clonedPrayerTemplate.querySelector(".date_table").textContent =
      item.date.split("T")[0];
    clonedPrayerTemplate.querySelector(".fajr_time_table").textContent =
      item.times.tong_saharlik;
    clonedPrayerTemplate.querySelector(".duhr_time_table").textContent =
      item.times.quyosh;
    clonedPrayerTemplate.querySelector(".asr_time_table").textContent =
      item.times.asr;
    clonedPrayerTemplate.querySelector(".maghrib_time_table").textContent =
      item.times.shom_iftor;
    clonedPrayerTemplate.querySelector(".isha_time_table").textContent =
      item.times.hufton;
    mainFragment.appendChild(clonedPrayerTemplate);
  });
  node.appendChild(mainFragment);
}

//   listening select element

elSelectRegion.addEventListener("click", () => {
  const selectedRegionValue = elSelectRegion.value;
  elWeeklyRegionTitle.textContent = selectedRegionValue;
  elMonthlyRegionTitle.textContent = selectedRegionValue;

  const newDate = new Date();
  const newMonth = newDate.getMonth() + 1;

  currentTimeUrl(
    `https://islomapi.uz/api/present/day?region=${selectedRegionValue}`
  );
  weeklyDataUrl(
    `https://islomapi.uz/api/present/week?region=${selectedRegionValue}`
  );
  monthlyDataUrl(
    `https://islomapi.uz/api/monthly?region=${selectedRegionValue}&month=${newMonth}`
  );
});

// fetching functions
async function currentTimeUrl(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderPrayerTimes(data);
  } catch (error) {
    console.log(error);
  }
}

async function weeklyDataUrl(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderWeeklyData(data, prayerWeeklyTable);
  } catch (error) {
    console.log(error);
  }
}

async function monthlyDataUrl(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderMonthlyData(data, prayerMonthlyTable);
  } catch (error) {
    console.log(error);
  }
}

const newDate = new Date();
const newMonth = newDate.getMonth() + 1;

currentTimeUrl("https://islomapi.uz/api/present/day?region=Toshkent");
weeklyDataUrl("https://islomapi.uz/api/present/week?region=Toshkent");
monthlyDataUrl(
  `https://islomapi.uz/api/monthly?region=Toshkent&month=${newMonth}`
);
