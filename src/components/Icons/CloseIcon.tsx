export default function CloseIcon({ size, className }: Icon) {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 6 12 12M6 18 18 6" />
		</svg>
	);
}
