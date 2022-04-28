import React from 'react';
import {Zoom} from 'react-reveal';

import {useState} from '@overmind/index';
import {BreadCrumb} from '@modules';

const SectionBreadCrumb = () => {
  const {lootboxes} = useState();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (lootboxes.selected) {
      const breadcrumbs = [
        {
          id: 1,
          label: 'Shop',
          url: '/shop',
        },
        {
          id: 2,
          label: lootboxes.selected.name,
          url: '',
        },
      ];
      setData(breadcrumbs);
    }

    return () => {};
  }, [lootboxes.selected]);
  
  return (
    <section className="my-20">
      <Zoom duration={500} delay={250}>
        <div className="container mx-auto">
          {data && (
            <BreadCrumb
              data={data}
            />
          )}
        </div>
      </Zoom>
    </section>
  );
};

export default SectionBreadCrumb;
