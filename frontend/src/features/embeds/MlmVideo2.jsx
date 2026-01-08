const fbBaseSrc = "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F837399041969401%2F&show_text=false&width=267&t=0";
const fbAutoplaySrc = `${fbBaseSrc}&autoplay=1&muted=1&loop=1&playsinline=1`;

function MlmVideo2({ 
  shouldPlayFbVideo = true ,

  }){
    return (
        <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <iframe
              title="Miller Land Management Facebook Video #2"
              src={shouldPlayFbVideo ? fbAutoplaySrc : fbBaseSrc}
              width="100%"
              // height="476"
              height="100%"
              style={{
                border: "none",
                overflow: "hidden",
                borderRadius: "1rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
                contentVisibility: "auto",
                // maxWidth: "420px",
              }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
    );
}
export default MlmVideo2;