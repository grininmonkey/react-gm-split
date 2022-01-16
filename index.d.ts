
declare module 'react-gm-split' {

	function Split (
		id?: string | number,
		as?: string,
		passProps?: boolean,
		gutterSize?: string | number,
		gutterStyle?: object,
		gutterRender?: any,
		primaryIndex?: number,
		collapsedSize?: string | number,
		primaryMinSize?: string | number,
		primaryMaxSize?: string | number,
		gutterClassName?: string,
		initialPrimarySize?: string | number,
		primaryInitialState?: boolean,
		secondaryInitialState?: boolean,
		collapsedInitialState?: boolean,
		props?: any
	): any;

	export default Split

}
