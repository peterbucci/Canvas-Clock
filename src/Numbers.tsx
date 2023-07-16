import Number from "./Number";

interface NumbersProps {
  size: { width: number; height: number };
  radius: number;
}

const Numbers: React.FC<NumbersProps> = ({ size, radius }) => {
  const fontSize = Math.max(12, radius * 0.18);

  return (
    <>
      <Number
        x={size.width / 2}
        y={size.height / 2 - radius + fontSize + 15}
        text="12"
        fontSize={fontSize}
      />
      <Number
        x={size.width / 2 + radius - fontSize - 15}
        y={size.height / 2}
        text="3"
        fontSize={fontSize}
      />
      <Number
        x={size.width / 2}
        y={size.height / 2 + radius - fontSize - 15}
        text="6"
        fontSize={fontSize}
      />
      <Number
        x={size.width / 2 - radius + fontSize + 15}
        y={size.height / 2}
        text="9"
        fontSize={fontSize}
      />
    </>
  );
};

export default Numbers;
