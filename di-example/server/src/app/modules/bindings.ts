import { Container } from 'inversify';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { ProjectModule } from './project/project.module';
import { ClientModule } from './client/client.module';
import { ComponentModule } from './component/component.module';
import { ComponentTypeModule } from './component-type/component-type.module';
import { OptionModule } from './option/option.module';
import { CategoryModule } from './category/category.module';
import { PostTypeModule } from './post-type/post-type.module';
import { PostModule } from './post/post.module';
import { MenuModule } from './menu/menu.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { AppProfileModule } from './app-profile/app-profile.module';
import { FileModule } from './file/file.module';
import { EditorModule } from './editor/editor.module';

export async function moduleBindings(container: Container): Promise<Container> {
    await container.loadAsync(AuthModule);
    await container.loadAsync(UserModule);
    await container.loadAsync(AccountModule);
    await container.loadAsync(ProjectModule);
    await container.loadAsync(ClientModule);
    await container.loadAsync(ComponentModule);
    await container.loadAsync(ComponentTypeModule);
    await container.loadAsync(OptionModule);
    await container.loadAsync(CategoryModule);
    await container.loadAsync(PostTypeModule);
    await container.loadAsync(PostModule);
    await container.loadAsync(MenuModule);
    await container.loadAsync(MenuItemModule);
    await container.loadAsync(AppProfileModule);
    await container.loadAsync(FileModule);
    await container.loadAsync(EditorModule);

    return container;
}
