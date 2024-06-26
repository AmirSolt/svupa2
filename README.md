
# Svupa2 (Saas Template)

A saas template for Sveltekit + Supabase + Stripe. It includes Auth, payment(subscription) and some other tools.



## 1. Supabase Setup Checklist

1. Setup database like so:
<details>
  <summary>SQL code</summary>
  
    ```sql
    -- profiles table
  create table
  public.profiles (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    full_name text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;



    -- wallets table
    create table
    public.wallets (
      profile_id uuid not null,
      created_at timestamp with time zone not null default now(),
      subscription_id text null,
      customer_id text null,
      constraint wallets_pkey primary key (profile_id),
      constraint wallets_profile_id_fkey foreign key (profile_id) references profiles (id) on update cascade on delete cascade
    ) tablespace pg_default;

    -- On user creation
    CREATE OR REPLACE FUNCTION on_user_create()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.profiles (id, full_name) VALUES (new.id, new.raw_user_meta_data ->> 'full_name');

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    CREATE OR REPLACE TRIGGER user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION on_user_create();

    -- On profile creation
    CREATE OR REPLACE FUNCTION on_profile_create()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.wallets (id) VALUES (NEW.id);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    CREATE OR REPLACE TRIGGER profile_created
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION on_profile_create();
    ```
</details>

2. In Auth providers > email, turn off 'Confirm email'.
3. In Auth providers > email templates, change 'Reset Password' template url to tokenHash(code). Other templates are not used by default.
4. Copy paste all API keys
5. to sync database types:
```bash
  supabase gen types typescript --project-id {project_id} > ./src/lib/utils/database.types.ts
```

### Third party
1. Setup an email smtp. Supabase setup in settings > authentication.
2. Turnstile by Cloudflare. Supabase setup in settings > authentication. -> https://github.com/ghostdevv/svelte-turnstile

---

## 2. Stripe Setup Checklist
1. create subscription plans
2. paste their ids in
```
 $lib/funcs/payment.server.ts in productIds:string[]
```
3. Copy paste all API keys and webhook secret
4. activate customer portal 
(https://[DOMAIN]/payment/portal)
5. configure customer portal 
(check Cancellations immdiate)
(check Subscription products)
6. https://dashboard.stripe.com/settings/checkout -> limit customers to 1 subscription
7. for usage based subscriptions, create a usageRecord for every usage:
```javascript
const usageRecord = await stripe.subscriptionItems.createUsageRecord(
  '{subscription_id}',
  {
    quantity: {quanity},
  }
);
```

## 3. Analytics
in app.html there are google and hotjar analytics tags. Remove or replace.


