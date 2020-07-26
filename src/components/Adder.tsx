import React, { useState } from 'react';

import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Form/Input';

type propTypes = { text?: string };

const Adder: React.FunctionComponent<propTypes> = ({
  text = '',
}: propTypes) => {
  const [value, setValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  if (isExpanded)
    return (
      <Form>
        <Input onChange={setValue} value={value} />
        <Button type="submit">Save</Button>
        <Button onClick={() => setIsExpanded(false)}>Cancel</Button>
      </Form>
    );
  return <Button onClick={() => setIsExpanded(true)}>{text}</Button>;
};

Adder.defaultProps = {
  text: '',
};

export default Adder;
