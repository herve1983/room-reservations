This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Local development

### Install supabase CLI

```text
brew install supabase/tap/supabase
```

### Initialize supabase services

```text
supabase init
```

Logs:

```text
Generate VS Code settings for Deno? [y/N] n
Finished supabase init.
```

At this point we have:

- supabase services Initialized for development purposes
- a supabase folder at the root of the project, containing some files.

### Start supabase services

```text
supabase start
```

Logs:

```text
Seeding data supabase/seed.sql...
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

At this point we have supabase services started and running for development purposes. Supabase dashboard will be available [here](http://localhost:54323)

## Migrations

### Create a migration using CLI

This will create a migration file under the supabase/migrations folder with the format <timestamp>\_init-schema.sql

```text
supabase migration new init-schema
```

Logs:

```text
Created new migration at supabase/migrations/20240224165446_init-schema.sql
```

### Apply locally the migrations

```text
supabase migration up
```

Logs:

```text
Connecting to local database...
Applying migration 20240224165446_init-schema.sql...
Local database is up to date.
```

### Update types locally using CLI

```text
supabase gen types typescript --local > types.gen.ts
```

This will update the file: types.gen.ts  
Always do it before after creating a new migrations and expose the new types created if needed.

## Tailwind

If tailwind intellisense do not work, in my case i guess its due to the fact that i have  
at the root of the project **_tailwind.config.ts_** instead of **_tailwind.config.js_**  
So to fix it :

- Delete postcss.config.js and tailwind.config.ts files (at the root of the project)
- Follow Next.js [documentation](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css#configuring-tailwind)

## Tips

### Expose types globally in the project

Create a file called <global.d.ts> at the root of the project.

```typescript
import type { Database } from "./types.gen";

declare global {
  type users = Database["public"]["Tables"]["users"]["Row"];
}
```

## Issues

### Conflicts with types.gen.ts file

#### Actions

Ignore from prettier types.gen.ts file by putting it in .prettierignore file

```text
# .pretterignore file

types.gen.ts
```

#### Explanations

When running

```text
prettier . --write
```

All files not inside .prettierignore file will be impacted when we will format the project using prettier.  
So we have to ignore types.gen.ts file by putting it inside .prettierignore file.  
This is important because After a commit, a Pull Request (PR) is created. Each time the CI files in the folder .github/workflows will be triggered.   
The ci.yml file contains a step of recreating the types, thus generating a types.gen.ts file. There will be a difference between the **_types.gen.ts_** file from the container running the ci.yml and the one from the feature-branch we want to merge in the develop branch as you can see below:

```text
Detected uncommitted changes after build. See status below:
diff --git a/types.gen.ts b/types.gen.ts
index 25fecfc..c187712 100644
--- a/types.gen.ts
+++ b/types.gen.ts
@@ -4,260 +4,260 @@ export type Json =
   | boolean
   | null
   | { [key: string]: Json | undefined }
-  | Json[];
+  | Json[]
 
 export type Database = {
   graphql_public: {
     Tables: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     Views: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     Functions: {
       graphql: {
         Args: {
-          operationName?: string;
-          query?: string;
-          variables?: Json;
-          extensions?: Json;
-        };
-        Returns: Json;
-      };
-    };
+          operationName?: string
+          query?: string
+          variables?: Json
+          extensions?: Json
+        }
+        Returns: Json
+      }
+    }
     Enums: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     CompositeTypes: {
-      [_ in never]: never;
-    };
-  };
+      [_ in never]: never
+    }
+  }
   public: {
     Tables: {
       users: {
         Row: {
-          created_at: string;
-          email: string;
-          firstname: string | null;
-          id: number;
-          lastname: string | null;
-          password: string;
-          updated_at: string;
-        };
+          created_at: string
+          email: string
+          firstname: string | null
+          id: number
+          lastname: string | null
+          password: string
+          updated_at: string
+        }
         Insert: {
-          created_at?: string;
-          email: string;
-          firstname?: string | null;
-          id?: never;
-          lastname?: string | null;
-          password: string;
-          updated_at?: string;
-        };
+          created_at?: string
+          email: string
+          firstname?: string | null
+          id?: never
+          lastname?: string | null
+          password: string
+          updated_at?: string
+        }
         Update: {
-          created_at?: string;
-          email?: string;
-          firstname?: string | null;
-          id?: never;
-          lastname?: string | null;
-          password?: string;
-          updated_at?: string;
-        };
-        Relationships: [];
-      };
-    };
+          created_at?: string
+          email?: string
+          firstname?: string | null
+          id?: never
+          lastname?: string | null
+          password?: string
+          updated_at?: string
+        }
+        Relationships: []
+      }
+    }
     Views: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     Functions: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     Enums: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     CompositeTypes: {
-      [_ in never]: never;
-    };
-  };
+      [_ in never]: never
+    }
+  }
   storage: {
     Tables: {
       buckets: {
         Row: {
-          allowed_mime_types: string[] | null;
-          avif_autodetection: boolean | null;
-          created_at: string | null;
-          file_size_limit: number | null;
-          id: string;
-          name: string;
-          owner: string | null;
-          owner_id: string | null;
-          public: boolean | null;
-          updated_at: string | null;
-        };
+          allowed_mime_types: string[] | null
+          avif_autodetection: boolean | null
+          created_at: string | null
+          file_size_limit: number | null
+          id: string
+          name: string
+          owner: string | null
+          owner_id: string | null
+          public: boolean | null
+          updated_at: string | null
+        }
         Insert: {
-          allowed_mime_types?: string[] | null;
-          avif_autodetection?: boolean | null;
-          created_at?: string | null;
-          file_size_limit?: number | null;
-          id: string;
-          name: string;
-          owner?: string | null;
-          owner_id?: string | null;
-          public?: boolean | null;
-          updated_at?: string | null;
-        };
+          allowed_mime_types?: string[] | null
+          avif_autodetection?: boolean | null
+          created_at?: string | null
+          file_size_limit?: number | null
+          id: string
+          name: string
+          owner?: string | null
+          owner_id?: string | null
+          public?: boolean | null
+          updated_at?: string | null
+        }
         Update: {
-          allowed_mime_types?: string[] | null;
-          avif_autodetection?: boolean | null;
-          created_at?: string | null;
-          file_size_limit?: number | null;
-          id?: string;
-          name?: string;
-          owner?: string | null;
-          owner_id?: string | null;
-          public?: boolean | null;
-          updated_at?: string | null;
-        };
-        Relationships: [];
-      };
+          allowed_mime_types?: string[] | null
+          avif_autodetection?: boolean | null
+          created_at?: string | null
+          file_size_limit?: number | null
+          id?: string
+          name?: string
+          owner?: string | null
+          owner_id?: string | null
+          public?: boolean | null
+          updated_at?: string | null
+        }
+        Relationships: []
+      }
       migrations: {
         Row: {
-          executed_at: string | null;
-          hash: string;
-          id: number;
-          name: string;
-        };
+          executed_at: string | null
+          hash: string
+          id: number
+          name: string
+        }
         Insert: {
-          executed_at?: string | null;
-          hash: string;
-          id: number;
-          name: string;
-        };
+          executed_at?: string | null
+          hash: string
+          id: number
+          name: string
+        }
         Update: {
-          executed_at?: string | null;
-          hash?: string;
-          id?: number;
-          name?: string;
-        };
-        Relationships: [];
-      };
+          executed_at?: string | null
+          hash?: string
+          id?: number
+          name?: string
+        }
+        Relationships: []
+      }
       objects: {
         Row: {
-          bucket_id: string | null;
-          created_at: string | null;
-          id: string;
-          last_accessed_at: string | null;
-          metadata: Json | null;
-          name: string | null;
-          owner: string | null;
-          owner_id: string | null;
-          path_tokens: string[] | null;
-          updated_at: string | null;
-          version: string | null;
-        };
+          bucket_id: string | null
+          created_at: string | null
+          id: string
+          last_accessed_at: string | null
+          metadata: Json | null
+          name: string | null
+          owner: string | null
+          owner_id: string | null
+          path_tokens: string[] | null
+          updated_at: string | null
+          version: string | null
+        }
         Insert: {
-          bucket_id?: string | null;
-          created_at?: string | null;
-          id?: string;
-          last_accessed_at?: string | null;
-          metadata?: Json | null;
-          name?: string | null;
-          owner?: string | null;
-          owner_id?: string | null;
-          path_tokens?: string[] | null;
-          updated_at?: string | null;
-          version?: string | null;
-        };
+          bucket_id?: string | null
+          created_at?: string | null
+          id?: string
+          last_accessed_at?: string | null
+          metadata?: Json | null
+          name?: string | null
+          owner?: string | null
+          owner_id?: string | null
+          path_tokens?: string[] | null
+          updated_at?: string | null
+          version?: string | null
+        }
         Update: {
-          bucket_id?: string | null;
-          created_at?: string | null;
-          id?: string;
-          last_accessed_at?: string | null;
-          metadata?: Json | null;
-          name?: string | null;
-          owner?: string | null;
-          owner_id?: string | null;
-          path_tokens?: string[] | null;
-          updated_at?: string | null;
-          version?: string | null;
-        };
+          bucket_id?: string | null
+          created_at?: string | null
+          id?: string
+          last_accessed_at?: string | null
+          metadata?: Json | null
+          name?: string | null
+          owner?: string | null
+          owner_id?: string | null
+          path_tokens?: string[] | null
+          updated_at?: string | null
+          version?: string | null
+        }
         Relationships: [
           {
-            foreignKeyName: "objects_bucketId_fkey";
-            columns: ["bucket_id"];
-            isOneToOne: false;
-            referencedRelation: "buckets";
-            referencedColumns: ["id"];
+            foreignKeyName: "objects_bucketId_fkey"
+            columns: ["bucket_id"]
+            isOneToOne: false
+            referencedRelation: "buckets"
+            referencedColumns: ["id"]
           },
-        ];
-      };
-    };
+        ]
+      }
+    }
     Views: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     Functions: {
       can_insert_object: {
         Args: {
-          bucketid: string;
-          name: string;
-          owner: string;
-          metadata: Json;
-        };
-        Returns: undefined;
-      };
+          bucketid: string
+          name: string
+          owner: string
+          metadata: Json
+        }
+        Returns: undefined
+      }
       extension: {
         Args: {
-          name: string;
-        };
-        Returns: string;
-      };
+          name: string
+        }
+        Returns: string
+      }
       filename: {
         Args: {
-          name: string;
-        };
-        Returns: string;
-      };
+          name: string
+        }
+        Returns: string
+      }
       foldername: {
         Args: {
-          name: string;
-        };
-        Returns: unknown;
-      };
+          name: string
+        }
+        Returns: unknown
+      }
       get_size_by_bucket: {
-        Args: Record<PropertyKey, never>;
+        Args: Record<PropertyKey, never>
         Returns: {
-          size: number;
-          bucket_id: string;
-        }[];
-      };
+          size: number
+          bucket_id: string
+        }[]
+      }
       search: {
         Args: {
-          prefix: string;
-          bucketname: string;
-          limits?: number;
-          levels?: number;
-          offsets?: number;
-          search?: string;
-          sortcolumn?: string;
-          sortorder?: string;
-        };
+          prefix: string
+          bucketname: string
+          limits?: number
+          levels?: number
+          offsets?: number
+          search?: string
+          sortcolumn?: string
+          sortorder?: string
+        }
         Returns: {
-          name: string;
-          id: string;
-          updated_at: string;
-          created_at: string;
-          last_accessed_at: string;
-          metadata: Json;
-        }[];
-      };
-    };
+          name: string
+          id: string
+          updated_at: string
+          created_at: string
+          last_accessed_at: string
+          metadata: Json
+        }[]
+      }
+    }
     Enums: {
-      [_ in never]: never;
-    };
+      [_ in never]: never
+    }
     CompositeTypes: {
-      [_ in never]: never;
-    };
-  };
-};
+      [_ in never]: never
+    }
+  }
+}
 
 export type Tables<
   PublicTableNameOrOptions extends
@@ -270,7 +270,7 @@ export type Tables<
 > = PublicTableNameOrOptions extends { schema: keyof Database }
   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
-      Row: infer R;
+      Row: infer R
     }
     ? R
     : never
@@ -278,11 +278,11 @@ export type Tables<
         Database["public"]["Views"])
     ? (Database["public"]["Tables"] &
         Database["public"]["Views"])[PublicTableNameOrOptions] extends {
-        Row: infer R;
+        Row: infer R
       }
       ? R
       : never
-    : never;
+    : never
 
 export type TablesInsert<
   PublicTableNameOrOptions extends
@@ -293,17 +293,17 @@ export type TablesInsert<
     : never = never,
 > = PublicTableNameOrOptions extends { schema: keyof Database }
   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
-      Insert: infer I;
+      Insert: infer I
     }
     ? I
     : never
   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
     ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
-        Insert: infer I;
+        Insert: infer I
       }
       ? I
       : never
-    : never;
+    : never
 
 export type TablesUpdate<
   PublicTableNameOrOptions extends
@@ -314,17 +314,17 @@ export type TablesUpdate<
     : never = never,
 > = PublicTableNameOrOptions extends { schema: keyof Database }
   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
-      Update: infer U;
+      Update: infer U
     }
     ? U
     : never
   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
     ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
-        Update: infer U;
+        Update: infer U
       }
       ? U
       : never
-    : never;
+    : never
 
 export type Enums<
   PublicEnumNameOrOptions extends
@@ -337,4 +337,5 @@ export type Enums<
   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
   : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
     ? Database["public"]["Enums"][PublicEnumNameOrOptions]
-    : never;
+    : never
+
Error: Process completed with exit code 1.
```
