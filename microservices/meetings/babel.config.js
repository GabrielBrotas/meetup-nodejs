module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      ['@babel/preset-typescript', {allowDeclareFields: true}],
    ],
    plugins: [
      ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
      [ 
        "module-resolver", {
          alias: {
            'domain': './src/domain',
            'infra': './src/infra',
            'application': './src/application',
          }
        }
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    ignore: [
      '**/*.spec.ts'
    ]
    
};