import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';

import { ProjectDTO } from '@project/project.dto';
import { BaseDTO } from '@base/base.dto';
import { ValidateNestedActionMeta } from '@decorators/validate-nested-action-meta.decorator';
import { UserDTO } from '@user/user.dto';
import { AccountDTO } from '@account/account.dto';

export enum ActionEventType {
    VisitStart = 'VISIT_START',
    VisitEnd = 'VISIT_END',
    MenuNavigation = 'MENU_NAVIGATION',
    LinkNavigation = 'LINK_NAVIGATION',
    ButtonClick = 'BUTTON_CLICK',
    MousePosition = 'MOUSE_POSITION',
    PageStall = 'PAGE_STALL',
    PageUnstall = 'PAGE_UNSTALL'
}

export class VisitStartMeta {
    constructor(model?: Partial<VisitStartMeta>) {
        Object.assign(this, model);
    }
}

export type ActionEventMetaUnion = VisitStartMeta;

export class ActionEventDTO extends BaseDTO {
    @Expose()
    @IsNotEmpty()
    account!: AccountDTO;

    @Expose()
    @IsNotEmpty()
    user!: UserDTO;

    @Expose()
    @IsNotEmpty()
    project!: ProjectDTO;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    name!: string;

    @Expose()
    @IsNotEmpty()
    @IsEnum(ActionEventType)
    type!: ActionEventType;

    @Expose()
    @IsNotEmpty()
    @ValidateNestedActionMeta()
    meta!: ActionEventMetaUnion;

    constructor(model?: Partial<ActionEventDTO>) {
        super();

        Object.assign(this, model);

        this.user = new UserDTO(model?.user as UserDTO);
        this.project = new ProjectDTO(model?.project as ProjectDTO);
        this.account = new AccountDTO(model?.account as AccountDTO);
    }
}
