const fbBaseSrc =
  "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1438938453892064%2F&show_text=false&width=320&t=0";
const fbAutoplaySrc = `${fbBaseSrc}&autoplay=1&muted=1&loop=1&playsinline=1`;

function MlmVideo1(
  { shouldPlayFbVideo = true ,

  }
) {

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        
      }}
    >
      <iframe
        title="Miller Land Management Facebook Video #1"
        src={shouldPlayFbVideo ? fbAutoplaySrc : fbBaseSrc}
        width="100%"
        height="480"
        style={{ border: "none", overflow: "hidden", maxWidth: "420px" }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture; web-share; fullscreen"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
export default MlmVideo1;
