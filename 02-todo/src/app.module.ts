import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false, // <-- esto desactiva la interfaz por defecto de http://localhost:3000/graphql | deberia desactivarse para produccion
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ]
    }),
    HelloWorldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

/**
 * playground 
 * 
 * Ahora para sustituir la interfaz por defecto de graphql 
 * existen varias opciones 
 * 
 * Altair (Gratuito)
 * Insomnia (Gratuito 15 dias)
 * Postman (Gratuito)
 * Apolo Studio (Gratuito)
 * 
 */