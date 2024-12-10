import icons from 'assets/icons/sprites/sprite.svg';

interface IconProps {
   id: string;
   className: string;
   width?: number;
   height?: number;
   color?: string;
   lineColor?: string;
}

export default function Icon({
   id,
   className,
   width = 25,
   height = 25,
   color = 'transparent',
   lineColor = '#fff',
}: IconProps) {
   return (
      <svg
         className={className}
         width={width}
         height={height ? height : width}
         fill={color}
         stroke={lineColor}
      >
         <use xlinkHref={`${icons}#${id}`} />
      </svg>
   );
}
