<script lang="ts">
  import "../(landing)/global.scss"
  import CodeInput from "$lib/components/CodeInput/CodeInput.svelte"
  import Button from "$lib/components/Button/Button.svelte"
  import Checkbox from "$lib/components/Checkbox/Checkbox.svelte"
  import Modal from "$lib/components/Modal/Modal.svelte"
  import axios from "axios"
  import Autocomplete from "./Autocomplete.svelte"
  import {goto} from "$app/navigation"

  let form = $state({
    uid: null,
    full_name: null,
    phone: null,
    email: null,
    city: null,
    restaurant_id: null,
    review: null,
    acceptance: {
      personal_info: false,
      konkurs: false
    }
  })

  let {
    data
  } = $props()

  let restaurants = $derived(data.restaurants.map(it => ({
    title: it.title,
    value: it.id
  })))

  let viewModalSubmitted = $state.raw()
  function submit() {
    axios.post('/_api/contest-register', form).then(() => {
      viewModalSubmitted = true
      setTimeout(() => {
        goto('/')
      }, 5000)
    }).catch(() => {
      alert('Небольшая проблема с сервером, попробуйте ещё раз')
    })
  }

  let canSubmit = $derived(
    form.uid && form.uid?.length === 6
    && form.full_name
    && form.phone
    && form.email
    && form.city
    && form.restaurant_id
    && form.review
    && form.acceptance.konkurs
    && form.acceptance.personal_info
  )

  let konkursAcceptanceModalVisible = $state.raw(false)

  function openKonkursAcceptance() {
    if (!form.acceptance.konkurs) {
      konkursAcceptanceModalVisible = true
    } else {
      form.acceptance.konkurs = false
    }
  }

  let personalInfoAcceptanceModalVisible = $state.raw(false)
  function openPersonalInfoAcceptance() {
    if (!form.acceptance.personal_info) {
      personalInfoAcceptanceModalVisible = true
    } else {
      form.acceptance.personal_info = false
    }
  }
</script>

<section>
  <h1>Регистрация</h1>

  <hr>

  {#if viewModalSubmitted}
    <Modal --modal-height="200px">
      <p>Вы успешно зарегистрировались, приятного аппетита!</p>
      <p>Вы окажетесь на главной через 5 секунд</p>
    </Modal>
  {/if}

  <form action="">
    <label>Уникальный номер участника</label>
    <CodeInput count={6} bind:value={form.uid}/>

    <label for="">ФИО</label>
    <input bind:value={form.full_name} type="text" placeholder="ввод" required>

    <label for="">Телефон</label>
    <input bind:value={form.phone} type="text" placeholder="ввод" required>

    <label for="">Почта</label>
    <input bind:value={form.email} type="text" placeholder="ввод" required>

    <label for="">Город</label>
    <input bind:value={form.city} type="text" placeholder="ввод" required>

    <label for="">Ресторан</label>
    <Autocomplete bind:value={form.restaurant_id} options={restaurants}/>

    <label for="">Оставьте отзыв</label>
    <input bind:value={form.review} type="text" placeholder="ввод" required>

    <div class="policy_checks">
      {#if personalInfoAcceptanceModalVisible}
        <Modal onBgTouch={() => {personalInfoAcceptanceModalVisible = false}}>
          <h2>СОГЛАСИЕ</h2>
          <p>на обработку персональных данных</p>

          <p>В соответствии со ст. 9 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» даю конкретное, предметное, информированное, сознательное и однозначное согласие на обработку своих персональных данных Автономной некоммерческой организации дополнительного профессионального образования «Новые образовательные технологии», расположенной по адресу: 660017, Красноярский край, г. Красноярск, пр. Мира, д.91, помещение 31, комната 32, 33, ИНН 2465154744, ОГРН 1162468114412 (далее - оператор), с целью моего участия в мероприятии «Национальный гастрономический фестиваль «Первые в космосе»: культурное и образовательное погружение в мир гастрономии (далее также – «Национальный гастрономический фестиваль «Первые в космосе», Фестиваль, Проект).</p>
          <p>Перечень моих персональных данных, на обработку которых я даю согласие: фамилия, имя, отчество, адрес регистрации по месту жительства, адрес фактического проживания, номер телефона, адрес электронной почты.</p>
          <p>Даю согласие на обнародование и дальнейшее использование фото и видеоматериалов с моим участием в любой форме и любыми не противоречащими закону способами, как предусмотренными ст.1317, ст. 1270 ГК РФ, в том числе в составе любых материалов, размещаемых путем доведения до всеобщего сведения в сети Интернет, включая веб-сайты АНО ДПО «Новые образовательные технологии» и его специальные проекты, страницы в социальных сетях, в группах и на каналах, в их версиях для мобильных и иных мультимедийных устройств, в мессенджерах, в мобильных приложениях, e-mail рассылках, презентациях, инфографике, видео, так и любыми иными способами, в том числе путем записи фото и видеоматериалов с моим участием, перевода в электронную и цифровую форму, изменения, сокращения, дополнения, комментирования, редактирования и иной переработки, воспроизведения и распространения.</p>
          <p>Разрешаю оператору производить автоматизированную, а также осуществляемую без использования средств автоматизации обработку моих персональных данных, а именно: сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение.</p>
          <p>Настоящее согласие дано мною добровольно и действует бессрочно. Субъект персональных данных вправе отозвать настоящее согласие на обработку своих персональных данных, письменно уведомив об этом оператора.</p>

          <div onclick={() => {personalInfoAcceptanceModalVisible = false}}>
            <Checkbox bind:checked={form.acceptance.personal_info}>
              Я согласен с условиями обработки персональных данных
            </Checkbox>
          </div>
        </Modal>
      {/if}
      <div onclick={openPersonalInfoAcceptance}>
        <Checkbox checked={form.acceptance.personal_info} manualCheck>
          Я согласен с условиями обработки персональных данных
        </Checkbox>
      </div>

      {#if konkursAcceptanceModalVisible}
        <Modal onBgTouch={() => {konkursAcceptanceModalVisible = false}}>
          В разработке

          <div onclick={() => {konkursAcceptanceModalVisible = false}}>
            <Checkbox bind:checked={form.acceptance.konkurs}>
              Я ознакомлен с положением о конкурсе
            </Checkbox>
          </div>
        </Modal>
      {/if}
      <div onclick={openKonkursAcceptance}>
        <Checkbox checked={form.acceptance.konkurs} manualCheck>
          Я ознакомлен с положением о конкурсе
        </Checkbox>
      </div>
    </div>

    <div class="btn">
      <Button onclick={submit} disabled={!canSubmit} dark filled>Зарегистрироватся</Button>
    </div>
  </form>
</section>

<style lang="scss">
  section {
    background: #FFFFFF;
    min-height: 100lvh;
    padding: 25px;
  }

  .policy_checks {
    margin-top: 15px;
  }

  form :global .checkbox + .checkbox {
    margin-top: 16px;
  }
  h1 {
    font-size: 24px;
    font-weight: 300;
    text-align: center;
  }

  hr {
    border-color: #50505033;
  }

  label {
    display: block;
    letter-spacing: .5px;
    font-family: Manrope, sans-serif;
    line-height: 23px;
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 5px;
    margin-top: 15px;
  }

  input[type=text] {
    display: block;
    width: 100%;
    background: #F3F3F3;
    border-radius: 10px;
    border: none;
    padding: 11px 15px;

    font-size: 12px;

    transition: outline 300ms;
    outline: 1px solid transparent;

    &::placeholder {
      color: #78858F;
      font-weight: 500;
    }

    &:focus {
      outline: 1px solid #1C212B;
    }
  }

  .btn {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    margin-top: 25px;

    :global .button {
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 400;
      padding: 12px 16px;
    }
  }
</style>