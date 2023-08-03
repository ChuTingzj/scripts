import {Configuration} from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
declare global{
  namespace NodeJS{
    interface ProcessEnv{
      filename:string
      PACK_ENV:'webpack'|'tsc'
    }
  }
}
const config: Configuration = {
  mode: 'production',
  output: {
    filename:process.env.filename,
  },
  resolve:{
    extensions:['.ts','...']
  },
  module:{
    rules:[
      {
        test: /\.ts$/,
        use: [
            'babel-loader',
            'ts-loader'
        ]
    },
    ],
  },
  plugins: [
		new NodePolyfillPlugin({
			includeAliases: ['process']
		})
	]
};
export default config;