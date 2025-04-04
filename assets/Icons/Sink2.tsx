import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

const Sink2: React.FC<IconProps> = ({ size = 24, color = '#000000' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G>
        <G>
          <Path
            d="M320,104h-8V80c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v24h-72V44c0-6.616,5.384-12,12-12c6.616,0,12,5.384,12,12
              v12c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V44c0-24.264-19.744-44-44-44c-24.256,0-44,19.736-44,44v60h-72V80
              c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v24h-8c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h9.192
              c5.944,44.288,36.072,80.92,76.68,96.216l-21.664,133.216c-0.76,4.632,0.56,9.36,3.6,12.936c3.04,3.576,7.496,5.632,12.192,5.632
              h96c4.696,0,9.152-2.056,12.184-5.632s4.36-8.304,3.6-12.936L234.12,232.216c40.608-15.296,70.736-51.928,76.68-96.216h9.2
              c8.832,0,16-7.168,16-16C336,111.168,328.832,104,320,104z M162.808,352l18.208-112h21.96l18.208,112H162.808z M192,208
              c-43.064,0-79-31.088-86.536-72h173.08C271,176.912,235.064,208,192,208z"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default Sink2;
