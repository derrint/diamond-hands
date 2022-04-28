import {BreadCrumb} from '@modules';

const SectionBreadCrumb = () => {
  const data = [
    {
      id: 1,
      label: 'Marketplace',
      url: '/marketplace',
    },
    {
      id: 2,
      label: 'Futuristic Pack',
      url: "/marketplace?_search='Futuristic Pack'",
    },
    {
      id: 3,
      label: 'Mr. Robot Hands',
      url: '',
    },
  ];
  
  return (
    <section className="my-20">
      <div className="container mx-auto">
        <BreadCrumb
          data={data}
        />
      </div>
    </section>
  );
};

export default SectionBreadCrumb;
