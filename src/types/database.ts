export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Relationship<
  ForeignKey extends string,
  Column extends string,
  ReferencedTable extends string,
  ReferencedColumn extends string,
  IsOneToOne extends boolean = false,
> = {
  foreignKeyName: ForeignKey;
  columns: [Column];
  isOneToOne: IsOneToOne;
  referencedRelation: ReferencedTable;
  referencedColumns: [ReferencedColumn];
};

type Table<Row, Insert, Relationships extends unknown[] = []> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: Relationships;
};

export interface Database {
  public: {
    Tables: {
      projects: Table<
        {
          id: string;
          name: string;
          slug: string;
          client: string;
          description: string;
          live_url: string | null;
          github_url: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          slug: string;
          client: string;
          description: string;
          live_url?: string | null;
          github_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      project_technologies: Table<
        {
          id: string;
          project_id: string;
          name: string;
          sort_order: number;
          created_at: string;
        },
        {
          id?: string;
          project_id: string;
          name: string;
          sort_order?: number;
          created_at?: string;
        },
        [
          Relationship<
            'project_technologies_project_id_fkey',
            'project_id',
            'projects',
            'id'
          >,
        ]
      >;
      project_screenshots: Table<
        {
          id: string;
          project_id: string;
          src: string;
          alt: string;
          sort_order: number;
          created_at: string;
        },
        {
          id?: string;
          project_id: string;
          src: string;
          alt: string;
          sort_order?: number;
          created_at?: string;
        },
        [
          Relationship<
            'project_screenshots_project_id_fkey',
            'project_id',
            'projects',
            'id'
          >,
        ]
      >;
      project_case_studies: Table<
        {
          id: string;
          project_id: string;
          problem: string | null;
          requirements: string | null;
          solution: string | null;
          role: string | null;
          development_process: string | null;
          challenges: string | null;
          testing: string | null;
          deployment: string | null;
          outcome: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          project_id: string;
          problem?: string | null;
          requirements?: string | null;
          solution?: string | null;
          role?: string | null;
          development_process?: string | null;
          challenges?: string | null;
          testing?: string | null;
          deployment?: string | null;
          outcome?: string | null;
          created_at?: string;
          updated_at?: string;
        },
        [
          Relationship<
            'project_case_studies_project_id_fkey',
            'project_id',
            'projects',
            'id',
            true
          >,
        ]
      >;
      skill_categories: Table<
        {
          id: string;
          name: string;
          icon: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          icon: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        }
      >;
      skills: Table<
        {
          id: string;
          category_id: string;
          name: string;
          sort_order: number;
          created_at: string;
        },
        {
          id?: string;
          category_id: string;
          name: string;
          sort_order?: number;
          created_at?: string;
        },
        [
          Relationship<
            'skills_category_id_fkey',
            'category_id',
            'skill_categories',
            'id'
          >,
        ]
      >;
      education_entries: Table<
        {
          id: string;
          qualification: string;
          institution: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          qualification: string;
          institution?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          description?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      journey_entries: Table<
        {
          id: string;
          phase: string;
          title: string;
          description: string;
          status: 'completed' | 'current' | 'future';
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          phase: string;
          title: string;
          description: string;
          status?: 'completed' | 'current' | 'future';
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      forensic_case_studies: Table<
        {
          id: string;
          case_id: string;
          title: string;
          summary: string | null;
          scenario: string | null;
          objective: string;
          evidence: string;
          evidence_basis: 'synthetic' | 'legally_permissible' | null;
          methodology: string | null;
          tools: string[];
          timeline: Json;
          analysis: string | null;
          findings: string | null;
          conclusion: string | null;
          limitations: string | null;
          status: 'draft' | 'published';
          published_at: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          case_id: string;
          title: string;
          summary?: string | null;
          scenario?: string | null;
          objective: string;
          evidence: string;
          evidence_basis?: 'synthetic' | 'legally_permissible' | null;
          methodology?: string | null;
          tools?: string[];
          timeline?: Json;
          analysis?: string | null;
          findings?: string | null;
          conclusion?: string | null;
          limitations?: string | null;
          status?: 'draft' | 'published';
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
    };
    Views: { [_ in never]: never };
    Functions: {
      is_portfolio_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}

export type TableName = keyof Database['public']['Tables'];
export type TableRow<Name extends TableName> =
  Database['public']['Tables'][Name]['Row'];
export type TableInsert<Name extends TableName> =
  Database['public']['Tables'][Name]['Insert'];
