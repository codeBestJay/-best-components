import type { ReactNode } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import CustomColumns, { CustomColumnsProps } from '../CustomColumns';

import "./index.scoped.less";

const INITIAL_PAGE = {
  pageSize: 10,
  pageNo: 1,
  total: 0,
};

const PAGE_SIZE_OPTIONS = ['10', '20', '30', '50', '100'];

interface PageFilter {
  pageNo: number;
  pageSize: number;
  total?: number;
}

interface IProps {
  /** 
   * 导出处理
   * */ 
  onExport?: () => void;
  /** 
   * 表格列的配置描述
   * */ 
  tableColumns: ColumnsType<any>;
  /** 
   * 数据数组
   * */ 
  dataSource: any[];
  /** 
   * 页面是否加载中
   * */ 
  loading?: boolean;
  /** 
   * 分页、排序、筛选变化时触发
   * */ 
  onChange?: (pagination: TablePaginationConfig, filter: any, sorter: any) => void;
  /** 
   * 分页变化时触发
   * */ 
  search?: (cursor: number, size: number) => void;
  /** 
   * 样式调整
   * */ 
  wrapperStyle?: any;
  /** 
   * 是否展示导出按钮
   * */ 
  showExport?: boolean;
  /** 
   * 配置其他功能按钮
   * */ 
  extraActions?: null | ReactNode;
  /** 
   * 导出规则提示
   * */ 
  exportRuleTips?: string;
  /** 
   * 分页
   * */ 
  pagination: PageFilter | false;
  /** 
   * 是否展示自定义列表
   * */ 
  customOptions?: CustomColumnsProps;
  [propName: string]: any;
}

const NormalTable: React.FC<IProps> = ({
  tableColumns,
  dataSource,
  exporting,
  extraActions = null,
  showExport = false,
  exportRuleTips,
  onExport,
  onChange,
  pagination = INITIAL_PAGE,
  loading,
  search,
  wrapperStyle,
  customOptions,
  ...props
}) => {
  return (
    <div className='expo-normal-table' style={{ ...wrapperStyle }}>
      {(showExport || extraActions) && (
        <div className='top'>
          <Space size={16}>{extraActions}</Space>
          {exportRuleTips ? (
            <span className='expo-rule-span'>
              导出规则&nbsp;
              <Tooltip title={exportRuleTips}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          ) : null}
          {showExport && (
            <Button className='exportBtn' loading={exporting} type="default" onClick={onExport}>
              导出
            </Button>
          )}
        </div>
      )}
      <div className='table'>
        <Table
          dataSource={dataSource}
          loading={loading}
          onChange={onChange}
          rowClassName={(_, i) => (i % 2 === 0 ? 'odd' : 'even')}
          scroll={{ x: 'max-content' }}
          pagination={
            pagination
              ? {
                  pageSizeOptions: PAGE_SIZE_OPTIONS,
                  showLessItems: true,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  total: pagination.total,
                  showTotal: () => `共${pagination.total}条`,
                  current: pagination.pageNo,
                  pageSize: pagination.pageSize,
                  onChange: (cursor, size) => {
                    search && search(cursor, size);
                  },
                  onShowSizeChange: (cursor, size) => {
                    search && search(cursor, size);
                  },
                }
              : false
          }
          columns={tableColumns}
          {...props}
        />
      </div>
      {customOptions ? (
        <CustomColumns
          {...customOptions}
          onOk={(value) => {
            customOptions.onOk(value);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default NormalTable;
