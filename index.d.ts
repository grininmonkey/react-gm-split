declare module 'react-gm-split' {

	import React from 'react';

	export type splitAs  = 'Columns' | 'Rows';
	export type Size = string | number;

	interface ReactGMSplitProps {
		id?: string | number,
		as?: splitAs,
		passProps?: boolean,
		gutterSize?: Size,
		gutterStyle?: React.CSSProperties,
		gutterRender?: any,
		primaryIndex?: number,
		collapsedSize?: Size,
		primaryMinSize?: Size,
		primaryMaxSize?: Size,
		gutterClassName?: string,
		initialPrimarySize?: Size,
		primaryInitialState?: boolean,
		secondaryInitialState?: boolean,
		collapsedInitialState?: boolean,
		props?: any
	}

	const Split: React.FC<ReactGMSplitProps>;

	export default Split;

}
