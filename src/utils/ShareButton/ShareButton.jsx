import { Button } from "@mantine/core";
import { IconShare } from "@tabler/icons";

const ShareButton = ({ title, url }) => {
  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title || "Club Chaser",
          url: url || "https://clubchaser.com",
        })
        .then(() => {
          console.log("Thanks for sharing!");
        });
    }
  };
  if (typeof window !== "undefined" && !navigator.share) return null;

  return (
    <Button
      mt="md"
      variant="default"
      fullWidth
      leftIcon={<IconShare />}
      onClick={handleClick}
    >
      Share
    </Button>
  );
};

export default ShareButton;
