import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const data = getWeatherData()
const isNight = (dt, sunrise, sunset) => {
  const timeToMinutes = str => {
    const [hours, minutes] = str.split(':').map(Number)
    return hours * 60 + minutes
  }
  const dtToMinutes = timeToMinutes(dt)
  const sunriseToMinutes = timeToMinutes(sunrise)
  const sunsetToMinutes = timeToMinutes(sunset)

  return dtToMinutes < sunriseToMinutes || dtToMinutes >= sunsetToMinutes
}
export default defineComponent({
  name: 'WeatherApp',

  setup() {
    return {
      data,
      WeatherConditionIcons,
      isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">

        <li v-for="card in data" class="weather-card" :class="{'weather-card--night':isNight(card.current.dt, card.current.sunrise, card.current.sunset)}">
          <div v-if="card.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{card.alert.sender_name}}: {{card.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{card.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{card.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="card.current.weather.description">{{WeatherConditionIcons[card.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{(card.current.temp-273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{(card.current.pressure*0.75).toFixed(0)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{card.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{card.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{card.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
