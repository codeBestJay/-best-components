import { FC, ReactNode, Fragment, useState, useLayoutEffect } from 'react';

import { Image, Popover, Typography } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import ImgIcon from './ImgIcon';
import { IMAGE_FALLBACK } from './constants';
import useDriver from './useDriver';
import { useKeepControl } from '../KeepOutlets/KeepOutlets';

export type MenuType = {
	type: 'menu' | 'page' | 'button';
	code: string;
	parent: Nullable<string>;
	name: string;
	order: number;
	path: string;
	filePath: Nullable<string>;
	redirect: Nullable<string>;
	icon: string;
	children: Nullable<MenuType[]>;
};

interface SiderType {
  foldImgUrl: string,
	style: LooseObject;
	globalStore: LooseObject;
  updateMenuFold: () => void,
  back2Home?: () => void,
}

const setTitleSize = (word: string) => {
	const wordCount = word.length;
	const minSize = 12;
	const maxSize = 20;
	if (wordCount <= 5) {
		return minSize;
	} else if (wordCount > 5 && wordCount < 10) {
		return maxSize - (wordCount - 5) * 2;
	} else {
		return minSize;
	}
};

const completeClassName = (
	classnames: string[],
	style: LooseObject
): string => {
	return classnames
		.filter(Boolean)
		.map((classname) => style[classname])
		.join(' ');
};

const SiderComponent: FC<SiderType> = ({style, globalStore, foldImgUrl, updateMenuFold, back2Home}) => {
	const navigate = useNavigate();
	const { clear } = useKeepControl();
	const driverObj = useDriver();
	const [expend, setExpend] = useState<string[]>([]);

	const logoContent = () => {
		return (
			<Typography.Link
				onClick={() => {if(back2Home) {back2Home()}}}
			>
				返回主页
			</Typography.Link>
		);
	};

	const [popoverMenuOpen, setPopoverMenuOpen] = useState<{
		[key: string]: boolean;
	}>({});

	const menuSelectedHandler = (menu: MenuType) => {
		if (menu.filePath) {
			clear();
			navigate(menu.path);
		} else if (menu.redirect) {
			clear();
			navigate(menu.redirect);
		}
	};

	const generateMenus = (
		source: MenuType[] = [],
		renderType: 'popover' | 'collapse' = 'collapse'
	): ReactNode => {
		return source.map((menu) => {
			const selectedMenu = globalStore.menuConfig.currentKeys?.includes(
				menu.code
			);

			if (menu.type === 'menu') {
				if (menu.children) {
					if (menu.filePath) {
						return (
							<div
								key={menu.code}
								onClick={() => menuSelectedHandler(menu)}
								style={{ cursor: 'pointer' }}
								className={completeClassName(
									['secondary-menu-link-wrapper', selectedMenu ? 'active' : ''],
									style
								)}
							>
								<Typography.Link
									key={menu.code}
									className={style['secondary-menu-link']}
								>
									{menu.name}
								</Typography.Link>
							</div>
						);
					} else {
						return (
							<Fragment key={menu.code}>
								<a
									key={menu.code}
									className={completeClassName(['secondary-menu-title'], style)}
									onClick={(e: any) => {
										if (expend?.includes(menu.code)) {
											setExpend(expend?.filter((item) => item !== menu.code));
										} else {
											setExpend([...expend, menu.code]);
										}
									}}
									style={{ display: 'block' }}
								>
									{!expend?.includes(menu.code) ? (
										<CaretRightOutlined />
									) : (
										<CaretDownOutlined />
									)}{' '}
									&nbsp;{menu.name}
								</a>
								{expend?.includes(menu.code) &&
									generateMenus(menu.children, renderType)}
							</Fragment>
						);
					}
				} else {
					return (
						<div
							key={menu.code}
							className={completeClassName(
								['secondary-menu-link-wrapper', selectedMenu ? 'active' : ''],
								style
							)}
							onClick={() => menuSelectedHandler(menu)}
						>
							<NavLink
								to={menu.path}
								key={menu.code}
								className={style['secondary-menu-link']}
							>
								{menu.name}
							</NavLink>
						</div>
					);
				}
			} else {
				return null;
			}
		});
	};

	useLayoutEffect(() => {
		setTimeout(() => {
			driverObj.setSteps([
				{
					element: '#logo',
					// onPopoverRender:
					popover: {
						side: 'right',
						title: '新功能上线',
						showButtons: ['close', 'next'],
						doneBtnText: '知道了',
						description: '平台主页入口搬到这里啦，鼠标移上就能看到。'
					}
				}
			]);
		}, 500);
	}, []);

	const CurrentApp = () => {
		return (
			<span style={{ color: '#969799', fontWeight: 'normal' }}>
				当前平台:{' '}
				{
					globalStore?.appList?.find(
						(item: any) => item.appCode === globalStore?.appCode
					)?.appName
				}
			</span>
		);
	};

	// console.log('globalStore.menus', globalStore.menus)

	return (
		<div className={style['sider-menu-container']}>
			<div
				className={style['menu-fold']}
				onClick={() => { if(typeof updateMenuFold === 'function') { updateMenuFold() } }}
			>
				<ImgIcon
					url={foldImgUrl}
					style={{ width: 20, height: 20 }}
				/>
			</div>
			<div className={style['primary-menu']}>
				<div className={style.logo}>
					<Popover
						placement="rightBottom"
						overlayClassName="logo-menu"
						title={<CurrentApp />}
						content={logoContent}
						trigger="hover"
					>
						<Image
							id="logo"
							preview={false}
							src={
								globalStore.profile?.logo ||
								`${globalStore.cdn}/static/hdc/default-logo.png`
							}
							fallback={IMAGE_FALLBACK}
						/>
					</Popover>
				</div>
				{globalStore.menus?.map((menu: MenuType) => {
					const selectedMenu = globalStore.menuConfig?.currentKeys?.includes(
						menu.code
					);
					return menu.children?.some(({ type }) => type === 'menu') ? (
						<Popover
							key={menu.code}
							placement="right"
							content={generateMenus(menu.children, 'popover')}
							overlayClassName={style['overlay-menu']}
							trigger={['click', 'hover']}
							onOpenChange={(open) => setPopoverMenuOpen({ [menu.code]: open })}
						>
							<div
								className={completeClassName(
									[
										'primary-menu-item',
										selectedMenu ? 'active' : '',
										popoverMenuOpen?.[menu.code] ? 'hover' : ''
									],
									style
								)}
								onClick={() => menuSelectedHandler(menu)}
							>
								{menu.name}
							</div>
						</Popover>
					) : menu.type === 'menu' ? (
						<div
							key={menu.code}
							className={completeClassName(
								[
									'primary-menu-item',
									selectedMenu ? 'active' : '',
									popoverMenuOpen?.[menu.code] ? 'hover' : ''
								],
								style
							)}
							onClick={() => menuSelectedHandler(menu)}
						>
							{menu.name}
						</div>
					) : null;
				})}
			</div>
			{globalStore.menuConfig.secondaryMenus?.length > 0 && (
				<div className={style['secondary-menu-wrapper']}>
					<div className={style.platform}>
						{/* 需要使用企业平台名称代替图片logo 建议加global的参数 platformAlias 进行获取 */}
						{/*  */}
						<span
							style={{
								fontSize: setTitleSize(
									globalStore.profile?.platformAlias || '换电SaaS平台'
								)
							}}
						>
							{globalStore.profile?.platformAlias || '换电SaaS平台'}
						</span>
					</div>
					<div className={style['secondary-menu']}>
						{generateMenus(globalStore.menuConfig.secondaryMenus)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SiderComponent;
