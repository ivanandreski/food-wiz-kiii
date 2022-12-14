"""alter ansp_tag

Revision ID: 447547529563
Revises: 9426e268a613
Create Date: 2022-05-07 12:39:28.542993

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '447547529563'
down_revision = '9426e268a613'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('annotation_span_dataset_tag', sa.Column('source', sa.String(), nullable=True))
    op.add_column('annotation_span_dataset_tag', sa.Column('removed', sa.Boolean(), nullable=True))
    op.add_column('annotation_span_dataset_tag', sa.Column('removedBy', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('annotation_span_dataset_tag', 'removedBy')
    op.drop_column('annotation_span_dataset_tag', 'removed')
    op.drop_column('annotation_span_dataset_tag', 'source')
    # ### end Alembic commands ###
