declare module 'react-gm-split' {

	import React from 'react';

	export type splitAs  = 'vertical' | 'horizontal';
	export type Size = string | number

	interface ReactGMSplitProps {
		id?: string | number,
		as?: splitAs,
		passProps?: boolean,
		/**  value as Pixels */
		gutterSize?: Size,
		gutterStyle?: React.CSSProperties,
		gutterRender?: React.Component,
		gutterOverlay?: boolean,
		/**  value as Pixels */
		collapsedSize?: Size,
		/**  value as Percent */
		leftTopMinSize?: Size,
		/**  value as Percent */
		leftTopMaxSize?: Size,
		gutterHoverStyle?: React.CSSProperties,
		leftTopBackground?: string,
		firstChildIsHeader?: boolean,
		collapseTransition?: boolean,
		/**  value as Percent */
		initialLeftTopSize?: Size,
		initialLeftTopState?: boolean,
		initialCollapsedState?: boolean
		rightBottomBackground?: string,
		initialRightBottomState?: boolean,
		props?: any
	}

	const Split: React.FC<ReactGMSplitProps>;

	export default Split;

}
