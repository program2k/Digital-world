import React, { memo } from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';

const BreadCrumb = ({ title, category }) => {
    const { IoIosArrowForward } = icons;
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },

    ];
    const breadCrumbs = useBreadcrumbs(routes);

    return (
        <div className='text-sm flex items-center gap-2'>
            {breadCrumbs?.filter((element) => !element.match.route === false).map(({ match, breadcrumb }, index, self) => (
                <Link className='flex items-center' key={match.pathname} to={match.pathname}>
                    <span className='hover:text-main'>{breadcrumb}</span>
                    {index !== self.length - 1 && <IoIosArrowForward/>}
                </Link>
           ))}
        </div>
    );
};

export default memo(BreadCrumb);