# e461e4cd92ce_add_gender_enum_to_user_model.py

"""Add gender enum to user model

Revision ID: e461e4cd92ce
Revises: <previous_revision_id>
Create Date: 2023-06-01 10:00:00.000000

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "e461e4cd92ce"
down_revision = "<previous_revision_id>"
branch_labels = None
depends_on = None


def upgrade():
    # commands to apply the migration
    op.create_table(
        "user",
        sa.Column("id", sa.String, primary_key=True),
        sa.Column(
            "gender", sa.Enum("male", "female", name="gender_enum"), nullable=False
        ),
    )


def downgrade():
    # commands to revert the migration
    op.drop_table("user")
