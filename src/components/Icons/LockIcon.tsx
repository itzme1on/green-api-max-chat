export default function LockIcon({ size, className }: Icon) {
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
			<path d="M6 10h12v11H6V10Zm3 0V6a3 3 0 0 1 6 0v4" />
		</svg>
	);
}
