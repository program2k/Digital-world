import { useMemo } from 'react';
import { generateRange } from '../utils/helper';

/**
 * Generates a pagination for a given number of total products and current page.
 *
 * @param {number} totalProduct - The total number of products.
 * @param {number} currentPage - The current page.
 * @param {number} [siblingCount=1] - The number of sibling pages to show on each side of the current page.
 * @return {Array} The generated pagination.
 */
const usePagination = (totalProduct, currentPage, siblingCount = 1) => {
     return useMemo(() => {
        const pageSize = 10;
        const pages = Math.ceil(totalProduct / pageSize);
        const totalPaginations = siblingCount + 5;
        if (pages <= totalPaginations) {
            return generateRange(1, pages);
        }
        const isShowLeft = (currentPage - siblingCount) > 2;
        const isShowRight = (currentPage + siblingCount) < pages - 1;
        if (isShowLeft && !isShowRight) {
            const rightStart = pages - 4;
            const rightRange = generateRange(rightStart, pages);
            return [1, '...', ...rightRange];
        }
        if (!isShowLeft && isShowRight) {
            const leftRange = generateRange(1, 5);
            return [...leftRange, '...', pages];
        }
        const siblingLeft = Math.max(currentPage - siblingCount, 1);
        const siblingRight = Math.max(currentPage + siblingCount, pages);
        if (isShowLeft && isShowRight) {
            const middlerange = generateRange(siblingLeft, siblingRight);
            return [1, '...', ...middlerange, '...', pages];
        }
    }, [totalProduct, currentPage, siblingCount]);
};

export default usePagination;