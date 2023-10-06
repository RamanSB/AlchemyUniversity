import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Typography } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

import { PropsWithChildren, useState } from "react";

const { Link, Paragraph, Text, Title } = Typography;

export const AdditionalDataContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isCollapsableOpen, setIsCollapsableOpen] = useState<boolean>(false);

  return (
    <Collapse
      ghost
      onChange={() => {
        setIsCollapsableOpen((prevState: boolean) => {
          return !prevState;
        });
      }}
    >
      <CollapsePanel
        showArrow={false}
        key="Additional Data"
        header={
          <Row align="middle">
            <Col span={6}>More Details:</Col>
            <Col span={2}></Col>
            <Col span={8}>
              <Link>
                {!isCollapsableOpen ? (
                  <>
                    <PlusOutlined /> Click to show more
                  </>
                ) : (
                  <>
                    <MinusOutlined /> Click to show less
                  </>
                )}
              </Link>
            </Col>
          </Row>
        }
      >
        {children}
      </CollapsePanel>
    </Collapse>
  );
};
