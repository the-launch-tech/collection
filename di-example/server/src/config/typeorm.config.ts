import { ConnectionOptions } from 'typeorm';

import { UserEntity } from '@user/user.entity';
import { AccountEntity } from '@account/account.entity';
import { ProjectEntity } from '@project/project.entity';
import { ClientEntity } from '@client/client.entity';
import { CategoryEntity } from '@category/category.entity';
import { ComponentEntity } from '@component/component.entity';
import { ComponentTypeEntity } from '@component-type/component-type.entity';
import { MenuEntity } from '@menu/menu.entity';
import { MenuItemEntity } from '@menu-item/menu-item.entity';
import { OptionEntity } from '@option/option.entity';
import { PostEntity } from '@post/post.entity';
import { PostTypeEntity } from '@post-type/post-type.entity';
import { RefreshTokenEntity } from '@refresh-token/refresh-token.entity';
import { ActionEventEntity } from '@action-event/action-event.entity';

export function getConnectionOption(): ConnectionOptions {
    return {
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USER,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: true,
        entities: [
            UserEntity,
            AccountEntity,
            ProjectEntity,
            ClientEntity,
            CategoryEntity,
            ComponentEntity,
            ComponentTypeEntity,
            MenuEntity,
            MenuItemEntity,
            OptionEntity,
            PostEntity,
            PostTypeEntity,
            RefreshTokenEntity,
            ActionEventEntity
        ],
        migrationsTableName: 'dev_migrations',
        migrations: ['migration/*.js'],
        cli: {
            migrationsDir: 'migration'
        }
    };
}
