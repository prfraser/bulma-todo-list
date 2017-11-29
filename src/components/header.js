import React from 'react';
import { Heading, Level, Title, Progress } from 'reactbulma'

const Header = ({ totalIncomplete, title }) => (
  <div>
    <Progress large value="15" max="100">15%</Progress>
    <Level>
      <Level.Item hasTextCentered>
        <div>
          <Heading>{title}</Heading>
          <Title>{ totalIncomplete }</Title>
        </div>
      </Level.Item>
    </Level>
  </div>
)

export default Header;