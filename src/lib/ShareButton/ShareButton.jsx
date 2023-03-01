import { Button } from "@mantine/core";

const ShareButton = ({ title, url }) => {
  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title || "WebShare API Demo",
          url: url || "https://codepen.io/ayoisaiah/pen/YbNazJ",
        })
        .then(() => {
          console.log("Thanks for sharing!");
        });
    }
  };

  return <Button onClick={handleClick}>Share</Button>;
};

export default ShareButton;
