import {FC, SVGProps} from "react";

interface Props {
  text: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  active?: boolean;
}

export const SidebarLink: FC<Props> = ({text, Icon, active}) => {
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-start text-xl hoverAnimation px-3 gap-3  ${
        active && "font-bold"
      }`}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};
