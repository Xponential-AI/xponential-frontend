import { clsx } from 'clsx';
import "./typography.scss";

const Typography = ({ variant, color, children, ...props }: any) => {
  const Component = variant ? variant : "p";

  return (
    <Component
      className={clsx({
        [`typography--variant-${variant}`]: variant,
        [`typography--color-${color}`]: color,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H1 = (props: any) => <Typography {...props} variant="h1" />;
export const H2 = (props: any) => <Typography {...props} variant="h2" />;
export const H3 = (props: any) => <Typography {...props} variant="h3" />;
export const H4 = (props: any) => <Typography {...props} variant="h4" />;
export const H5 = (props: any) => <Typography {...props} variant="h5" />;
export const H6 = (props: any) => <Typography {...props} variant="h6" />;
export const P = (props: any) => <Typography {...props} variant="p" />;
export const Span = (props: any) => <Typography {...props} variant="span" />;

