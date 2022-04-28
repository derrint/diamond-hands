import {Button} from '@elements';

const breadCrumb = ({data}) => (
  <span className="bread-crumb">
    {
        data.length > 0 && data.map((item, index) => (
          <Button key={`breadCrumb-${index}`} href={item.url ? item.url : '#'}>{item.label}</Button>
        ))
      }
  </span>
);

export default breadCrumb;
