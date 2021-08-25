import React from 'react';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => <div className="md:container md:mx-auto">{children}</div>;

export default Layout;
