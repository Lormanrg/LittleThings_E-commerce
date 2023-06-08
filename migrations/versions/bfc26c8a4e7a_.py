"""empty message

Revision ID: bfc26c8a4e7a
Revises: f7171203eb5a
Create Date: 2023-06-08 10:15:29.441182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bfc26c8a4e7a'
down_revision = 'f7171203eb5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitem', schema=None) as batch_op:
        batch_op.alter_column('tshirts_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cartitem', schema=None) as batch_op:
        batch_op.alter_column('tshirts_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
