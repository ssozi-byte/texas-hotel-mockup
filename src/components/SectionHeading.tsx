type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, description, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-cream/60 sm:text-base">{description}</p>
      )}
    </div>
  )
}
