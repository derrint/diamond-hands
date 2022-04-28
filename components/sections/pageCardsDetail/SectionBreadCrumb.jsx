/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
import React from 'react';
import {Zoom} from 'react-reveal';
import {useRouter} from 'next/router';

import {useState} from '@overmind/index';
import {BreadCrumb} from '@modules';
import {getStringFromSlug} from '@utils/helper';

const SectionBreadCrumb = () => {
  const router = useRouter();
  const {cards} = useState();

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const URIs = router.pathname.split('/');
    const parent = URIs[1];

    if (cards.selected) {
      const breadcrumbs = [
        {
          id: 1,
          label: getStringFromSlug(parent),
          url: '/' + parent,
        },
        {
          id: 2,
          label: cards.selected.name,
          url: '',
        },
      ];
      setData(breadcrumbs);
    }

    return () => {};
  }, [cards.selected]);
  
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
