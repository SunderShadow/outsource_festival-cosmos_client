<script lang="ts">
  import "../(landing)/global.scss"
  import CodeInput from "$lib/components/CodeInput/CodeInput.svelte"
  import Button from "$lib/components/Button/Button.svelte"
  import Checkbox from "$lib/components/Checkbox/Checkbox.svelte"

  let form = $state({
    uniqueNumber: null,
    fullName: null,
    phone: null,
    email: null,
    city: null,
    restaurant: null,
    review: null,
    acceptance: {
      personal_info: false,
      konkurs: false
    }
  })

  let canSubmit = $derived(
    form.uniqueNumber && form.uniqueNumber?.length === 6
    && form.fullName
    && form.phone
    && form.email
    && form.city
    && form.restaurant
    && form.review
    && form.acceptance.konkurs
    && form.acceptance.personal_info
  )
</script>

<section>
  <h1>Регистрация</h1>

  <hr>

  <form action="">
    <label>Уникальный номер участника</label>
    <CodeInput count={6} bind:value={form.uniqueNumber}/>

    <label for="">ФИО</label>
    <input bind:value={form.fullName} type="text" placeholder="ввод">

    <label for="">Телефон</label>
    <input bind:value={form.phone} type="text" placeholder="ввод">

    <label for="">Почта</label>
    <input bind:value={form.email} type="text" placeholder="ввод">

    <label for="">Город</label>
    <input bind:value={form.city} type="text" placeholder="ввод">

    <label for="">Ресторан</label>
    <input bind:value={form.restaurant} type="text" placeholder="ввод">

    <label for="">Оставьте отзыв</label>
    <input bind:value={form.review} type="text" placeholder="ввод">

    <div class="policy_checks">
      <Checkbox bind:checked={form.acceptance.personal_info}>
        Я согласен с условиями обработки персональных данных
      </Checkbox>

      <Checkbox bind:checked={form.acceptance.konkurs}>
        Я ознакомлен с положением о конкурсе
      </Checkbox>
    </div>

    <div class="btn">
      <Button disabled={!canSubmit} dark filled>Зарегистрироватся</Button>
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