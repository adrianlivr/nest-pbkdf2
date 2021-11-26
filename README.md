<p align="center">
  <a href="http://nestjs.com"><img src="https://nestjs.com/img/logo_text.svg" alt="Nest Logo" width="320" /></a>
</p>

<p align="center">
  The PBKDF2 <a href="https://github.com/nestjs/nest">Nest</a> module for key derivation
</p>

## Configure

app.module.ts

```ts
...
@Module({
	...
	imports: [
		...
		Pbkdf2Module.forRoot({
			// Default values
			hashBytes: 32, /* optional */
			saltBytes: 16, /* optional */
			digest: 'sha512', /* optional */
			iterations: 65535, /* optional */
			encoding: 'hex', /* optional */
		}),
		...
		// For asynchronous configuration
		...
		Pbkdf2Module.forRootAsync({
			import: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				hashBytes: config.get('HASH_BYTES')
			})
			inject: [ConfigService]
		}),
		...
		// OR
		AesGcmModule.forRootAsync({
			useClass: Pbkdf2ConfigClass
		}),
		...
	],
	...
})
...

```

your.service.ts

```ts
...
@Injectable()
export class YourService{
	constructor(private readonly pbkdf2Service: Pbkdf2Service){
	}

	async hash(text: string): Promise<string> {
		return await this.pbkdf2Service.hash(text);
	}

	hashSync(text: string): string {
    return this.pbkdf2Service.hash(text);
	}

  async compare(password: string, hash: string): Promise<boolean> {
    return await this.pbkdf2Service.compare(password, hash);
  }

	compareSync(password: string, hash: string): boolean {
		return this.pbkdf2Service.compare(password, hash);
	}
}
...
```

##### _If you want hash and compare passwords with security, use argon2 with the 2id version_

### Use Asynchronous methods for better performance
