import { defineComponent, toRef } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    return {
      title: toRef(() => props.meetup.title),
      image: toRef(() => props.meetup.image),
      description: toRef(() => props.meetup.description),
      agenda: toRef(() => props.meetup.agenda),
      organizer: toRef(() => props.meetup.organizer),
      place: toRef(() => props.meetup.place),
      date: toRef(() => props.meetup.date),
    }
  },

  template: `
    <div>

      <MeetupCover :title :image />

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>

            <MeetupDescription :description />

            <h2>Программа</h2>

            <MeetupAgenda v-if="agenda?.length" :agenda />
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <UiAlert v-if="!agenda || agenda.length === 0">Программа пока пуста...</UiAlert>

          </div>
          <div class="meetup__aside">

            <MeetupInfo :organizer :place :date />

            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
