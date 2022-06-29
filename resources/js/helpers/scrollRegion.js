export const getYAxisByElement = (element, gap = 0) => {
    if (!element) return -1;
    const { top:body } = document.body.getBoundingClientRect();
    const { top:elem } = element.getBoundingClientRect();

    return Math.floor(Math.abs(body) + elem - gap);

}