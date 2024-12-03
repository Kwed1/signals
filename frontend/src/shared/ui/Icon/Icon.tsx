import icons from 'assets/icons/sprites/sprite.svg'

interface IconProps {
    id: string;
    className: string;
    size?: number;
    color?: string;
    lineColor?: string;
}

export default function Icon({ id, className, size = 25, color = "transparent", lineColor = '#fff'}: IconProps) {
    return (
        <svg className={className} width={size} height={size} fill={color} stroke={lineColor}>
            <use xlinkHref={`${icons}#${id}`} />
        </svg>
    )
}