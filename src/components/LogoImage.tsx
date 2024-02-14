import { getImageProps } from 'next/image';

export default function LogoImage() {
  const common = { alt: 'Palwiz Logo', width: 800, height: 400 };
  const {
    props: { srcSet: dark },
  } = getImageProps({ ...common, src: '/images/logo-dark.webp' });
  const {
    props: { srcSet: light, ...rest },
  } = getImageProps({ ...common, src: '/images/logo-dark.webp' });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={dark} />
      <source media="(prefers-color-scheme: light)" srcSet={light} />
      <img {...rest} />
    </picture>
  );
}
