<script lang="ts">

  let {
    article
  } = $props()

  let smallTitle = $derived.by(() => {
    for (const titlePart of article.title.split(' ')) {
      if (
        (titlePart.toUpperCase() === titlePart && titlePart.length > 8)
        || titlePart.length > 11
      ) {
        return true
      }
    }
    return false
  })
</script>

<article>
  <img src={article.thumbnails.card} alt="" loading="lazy">
  <div class="content">
    <a href="/restaurants/{article.slug}" data-sveltekit-noscroll></a>
    <h2 class:small={smallTitle}>{article.title}</h2>
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
    margin: 0;

    font-size: 18px;
    font-weight: 500;
    color: #181818;

    &.small {
      font-size: 15px;
    }
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