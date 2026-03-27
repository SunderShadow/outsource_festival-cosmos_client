<script lang="ts">

  let {
    article
  } = $props()
</script>

<article>
  <img src={article.thumbnails.card} alt="">
  <div class="content">
    <a href="/restaurants/{article.slug}" data-sveltekit-noscroll></a>
    <h2>{article.title}</h2>
    <hr>
    <div class="labels">
      <div class="label">
        <div class="icon">
          <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.09511 3.21275C6.09511 5.48597 3.1927 7.43444 3.1927 7.43444C3.1927 7.43444 0.290283 5.48597 0.290283 3.21275C0.290283 2.4376 0.596072 1.6942 1.14038 1.14608C1.68469 0.597967 2.42293 0.290039 3.1927 0.290039C3.96247 0.290039 4.70071 0.597967 5.24502 1.14608C5.78932 1.6942 6.09511 2.4376 6.09511 3.21275Z" stroke="black" stroke-width="0.580483" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.1927 4.18696C3.72702 4.18696 4.16017 3.75078 4.16017 3.21272C4.16017 2.67467 3.72702 2.23849 3.1927 2.23849C2.65838 2.23849 2.22523 2.67467 2.22523 3.21272C2.22523 3.75078 2.65838 4.18696 3.1927 4.18696Z" stroke="black" stroke-width="0.580483" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="info">{article.location}</span>
      </div>
      <div class="label">
        <div class="icon">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.4784 7.08117V6.37303H2.12433C2.02401 6.37303 1.93998 6.33904 1.87224 6.27106C1.80449 6.20308 1.7705 6.11905 1.77026 6.01897C1.77003 5.91888 1.80402 5.83485 1.87224 5.76687C1.94045 5.69889 2.02449 5.6649 2.12433 5.6649H2.4784V4.95676H2.12433C2.02401 4.95676 1.93998 4.92277 1.87224 4.85479C1.80449 4.78681 1.7705 4.70278 1.77026 4.60269C1.77003 4.50261 1.80402 4.41858 1.87224 4.3506C1.94045 4.28262 2.02449 4.24862 2.12433 4.24862H2.4784V1.41608C2.4784 1.31576 2.51239 1.23173 2.58037 1.16398C2.64835 1.09624 2.73239 1.06225 2.83247 1.06201H4.77984C5.32275 1.06201 5.78304 1.25085 6.16071 1.62852C6.53838 2.00619 6.72722 2.46648 6.72722 3.00939C6.72722 3.55229 6.53838 4.01258 6.16071 4.39025C5.78304 4.76792 5.32275 4.95676 4.77984 4.95676H3.18654V5.6649H4.24874C4.34906 5.6649 4.43321 5.69889 4.50119 5.76687C4.56917 5.83485 4.60305 5.91888 4.60281 6.01897C4.60257 6.11905 4.56858 6.2032 4.50084 6.27142C4.43309 6.33963 4.34906 6.37351 4.24874 6.37303H3.18654V7.08117C3.18654 7.18149 3.15255 7.26564 3.08457 7.33362C3.01658 7.4016 2.93255 7.43547 2.83247 7.43524C2.73239 7.435 2.64835 7.40101 2.58037 7.33327C2.51239 7.26552 2.4784 7.18149 2.4784 7.08117ZM3.18654 4.24862H4.77984C5.12211 4.24862 5.41422 4.12765 5.65616 3.88571C5.89811 3.64376 6.01908 3.35165 6.01908 3.00939C6.01908 2.66712 5.89811 2.37501 5.65616 2.13307C5.41422 1.89112 5.12211 1.77015 4.77984 1.77015H3.18654V4.24862Z" fill="black"/>
          </svg>
        </div>
        <span class="info">от {article.min_cost} руб</span>
      </div>
    </div>
  </div>
</article>

<style lang="scss">
  a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  hr {
    background-color: #44444424;
    height: 1px;
    border: none;
  }

  article {
    position: relative;
    padding: 6px;
    display: flex;
    align-items: center;

    gap: 22px;

    background-color: #FCFCFCF2;
    border: 1px solid #EEEEEE;
    box-shadow: 
        0 201.56px 80.79px 0 #00000003, 
        0 314.34px 87.98px 0 #00000000, 
        0 113.58px 67.99px 0 #00000005, 
        0 50.39px 50.39px 0 #0000000A, 
        0 12.8px 28px 0 #0000000A;

    backdrop-filter: blur(26px);
    border-radius: 20px;
  }

  img {
    width: 145px;
    height: 100%;
    border-radius: 18px;
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    margin-right: 5px;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: #181818;
    margin: 0;
  }

  .fast-info {
    color: #767676;
    margin: 0;
    font-size: 11px;
  }

  .labels {
    margin-top: 5px;
  }

  .labels > .label + .label {
    margin-top: 2px;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 4px;

    background: #F5F5F5;
    border-radius: 10em;
    padding: 5px 6px;

    .icon {
      display: flex;

      width: 18px;
      height: 18px;
      background: #fff;
      border-radius: 10em;

      svg {
        margin: auto;
      }
    }

    .info {
      font-size: 8px;
      font-weight: 600;
      line-height: 8px;
    }
  }
</style>