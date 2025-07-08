import { defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupCount = 5
    const selectedMeetupID = ref(1)
    const meetup = ref(null)

    const onPreviousClick = () => {
      selectedMeetupID.value = selectedMeetupID.value > 1 ? selectedMeetupID.value - 1 : 1
    }
    const onNextClick = () => {
      selectedMeetupID.value = selectedMeetupID.value < meetupCount ? selectedMeetupID.value + 1 : meetupCount
    }

    watchEffect(async () => {
      meetup.value = await getMeetup(selectedMeetupID.value)
    })
    return {
      meetupCount,
      selectedMeetupID,
      meetup,
      onPreviousClick,
      onNextClick,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedMeetupID <= 1"
          @click="onPreviousClick"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">

          <div v-for="index in meetupCount" class="radio-group__button">
            <input
              :id="'meetup-id-'+ index"
              class="radio-group__input"
              type="radio"
              name="meetupId"
             :value="index"
             v-model="selectedMeetupID"
            />
            <label :for="'meetup-id-'+ index" class="radio-group__label">{{ index }}</label>
          </div>

        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedMeetupID >= meetupCount"
          @click="onNextClick"
        >Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup?.title}}</h1>
        </div>
      </div>

    </div>
  `,
})
