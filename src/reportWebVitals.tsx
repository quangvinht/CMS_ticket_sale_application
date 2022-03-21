const reportWebVitals : any = (onPerfEntr : any) => {
  if (onPerfEntr && onPerfEntr instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntr);
      getFID(onPerfEntr);
      getFCP(onPerfEntr);
      getLCP(onPerfEntr);
      getTTFB(onPerfEntr);
    });
  }
};

export default reportWebVitals;
